package com.rilldata;

import com.rilldata.calcite.dialects.Dialects;
import org.graalvm.nativeimage.IsolateThread;
import org.graalvm.nativeimage.c.function.CEntryPoint;
import org.graalvm.nativeimage.c.function.CFunctionPointer;
import org.graalvm.nativeimage.c.function.InvokeCFunctionPointer;
import org.graalvm.nativeimage.c.type.CCharPointer;
import org.graalvm.nativeimage.c.type.CTypeConversion;
import org.graalvm.word.WordFactory;

/**
 * This class contains an entry point (a function callable from a native executable, ie C/Go executable).
 */
public class SqlConverterEntrypoint
{
  private static SqlConverter sqlConverter;

  interface AllocatorFn extends CFunctionPointer
  {
    @InvokeCFunctionPointer
    CCharPointer call(long size);
  }

  @CEntryPoint(name = "convert_sql")
  public static CCharPointer convertSql(IsolateThread thread, AllocatorFn allocatorFn, CCharPointer sql,
      CCharPointer schema, CCharPointer dialect
  )
  {
    try {
      String dialectString = CTypeConversion.toJavaString(dialect);
      Dialects dialectEnum = Dialects.valueOf(dialectString.toUpperCase());
      String javaSchemaString = CTypeConversion.toJavaString(schema);
      SqlConverter sqlConverter = new SqlConverter(javaSchemaString);
      String javaSqlString = CTypeConversion.toJavaString(sql);
      String runnableQuery = sqlConverter.convert(javaSqlString, dialectEnum.getSqlDialect());
      if (runnableQuery == null) {
        return WordFactory.nullPointer();
      }
      return convertToCCharPointer(allocatorFn, runnableQuery);
    } catch (Exception e) {
      e.printStackTrace(); // todo level-logging for native libraries?
      return convertToCCharPointer(allocatorFn, String.format("{'error': '%s'}", e.getMessage()));
    }
  }

  @CEntryPoint(name = "get_ast")
  public static CCharPointer getAST(IsolateThread thread, AllocatorFn allocatorFn, CCharPointer sql,
      CCharPointer schema
  )
  {
    try {
      String javaSchemaString = CTypeConversion.toJavaString(schema);
      SqlConverter sqlConverter = new SqlConverter(javaSchemaString);
      String sqlString = CTypeConversion.toJavaString(sql);
      byte[] ast = sqlConverter.getAST(sqlString);
      return convertToCCharPointer(allocatorFn, ast);
    } catch (Exception e) {
      e.printStackTrace();
      return WordFactory.nullPointer();
    }
  }

  private static CCharPointer convertToCCharPointer(AllocatorFn allocatorFn, String javaString)
  {
    return convertToCCharPointer(allocatorFn, javaString.getBytes());
  }

  private static CCharPointer convertToCCharPointer(AllocatorFn allocatorFn, byte[] b)
  {
    CCharPointer a = allocatorFn.call(b.length + 1);
    for (int i = 0; i < b.length; i++) {
      a.write(i, b[i]);
    }
    a.write(b.length, (byte) 0);
    return a;
  }
}
