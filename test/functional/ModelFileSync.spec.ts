import { RootConfig } from "$common/config/RootConfig";
import { expect } from "@playwright/test";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { execSync } from "node:child_process";
import { FunctionalTestBase } from "./FunctionalTestBase";
const MODEL_0_FILE = `${MODEL_FOLDER}/model_0.sql`;
const MODEL_1_FILE = `${MODEL_FOLDER}/model_1.sql`;
    expect(existsSync(MODEL_0_FILE)).toBe(false);
      { name: "model_0", query: "" },
    expect(existsSync(MODEL_0_FILE)).toBe(true);
    const [model] = this.getModels("tableName", "model_0");
    expect(readFileSync(MODEL_0_FILE).toString()).toBe(SingleTableQuery);
    const [, persistentModel] = this.getModels("tableName", "model_0");
    writeFileSync(MODEL_0_FILE, TwoTableJoinQuery);
    const [, newPersistentModel] = this.getModels("tableName", "model_0");
      { name: "model_0", query: SingleTableQuery },
    expect(existsSync(MODEL_0_FILE)).toBe(true);
    execSync(`rm ${MODEL_0_FILE}`);
    const [model] = this.getModels("tableName", "model_0");
    expect(existsSync(MODEL_0_FILE)).toBe(false);
      { name: "model_0", query: SingleTableQuery },
    expect(existsSync(MODEL_0_FILE)).toBe(true);
    expect(existsSync(MODEL_1_FILE)).toBe(false);
    execSync(`mv ${MODEL_0_FILE} ${MODEL_1_FILE}`);
    const [model0] = this.getModels("tableName", "model_0");
    const [model1, persistentModel1] = this.getModels("tableName", "model_1");
    expect(existsSync(MODEL_0_FILE)).toBe(false);
    expect(existsSync(MODEL_1_FILE)).toBe(true);
    const MODEL_00_FILE = `${MODEL_FOLDER}/model_00.sql`;
    const MODEL_10_FILE = `${MODEL_FOLDER}/model_10.sql`;
      { name: "model_0", query: SingleTableQuery },
      { name: "model_1", query: TwoTableJoinQuery },
    expect(existsSync(MODEL_0_FILE)).toBe(true);
    expect(existsSync(MODEL_00_FILE)).toBe(false);
    expect(existsSync(MODEL_1_FILE)).toBe(true);
    expect(existsSync(MODEL_10_FILE)).toBe(false);
    const [model0] = this.getModels("tableName", "model_0");
    const [model1] = this.getModels("tableName", "model_1");
    // rename model_0 => model_00, model_1 => model_10 then add a new file model_0.sql
      "model_00",
      "model_10",
    writeFileSync(MODEL_0_FILE, NestedQuery);
    expect(readFileSync(MODEL_0_FILE).toString()).toBe(NestedQuery);
    expect(readFileSync(MODEL_00_FILE).toString()).toBe(SingleTableQuery);
    expect(existsSync(MODEL_1_FILE)).toBe(false);
    expect(readFileSync(MODEL_10_FILE).toString()).toBe(TwoTableJoinQuery);

    const [, persistentModel0] = this.getModels("tableName", "model_00");
    const [, persistentModel1] = this.getModels("tableName", "model_10");
    const [, persistentModel2] = this.getModels("tableName", "model_0");
    const INVALID_FILE = "model_0.sq";
      { name: "model_0", query: SingleTableQuery },
    expect(existsSync(MODEL_0_FILE)).toBe(true);
    execSync(`mv ${MODEL_0_FILE} ${INVALID_FILE}`);
    let [model] = this.getModels("tableName", "model_0");
    expect(existsSync(MODEL_0_FILE)).toBe(false);
    execSync(`mv ${INVALID_FILE} ${MODEL_0_FILE}`);
    [model] = this.getModels("tableName", "model_0");
    expect(model.tableName).toBe("model_0");
    expect(readFileSync(MODEL_0_FILE).toString()).toBe(SingleTableQuery);