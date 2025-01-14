.PHONY: build
build:
	go generate ./sql
	go build -o main ./cmd

.PHONY: run
run:
	go generate ./sql
	go run ./cmd

.PHONY: test
test:
	go generate ./sql
	go test ./...

.PHONY: clean
clean:
	rm -rf sql/deps
	rm -f main
	rm -rf release

generate.proto.api:
	go install \
		"google.golang.org/protobuf/cmd/protoc-gen-go" \
		"google.golang.org/grpc/cmd/protoc-gen-go-grpc" \
		"github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway" \
		"github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2"
	protoc --proto_path=api \
		--go_out=api --go_opt=paths=source_relative \
		--go-grpc_out=api --go-grpc_opt=paths=source_relative \
		--grpc-gateway_out=api --grpc-gateway_opt=logtostderr=true --grpc-gateway_opt=paths=source_relative --grpc-gateway_opt=generate_unbound_methods=true \
		--openapiv2_out=api --openapiv2_opt=logtostderr=true \
		runtime.proto

generate.proto.sql:
	go install "google.golang.org/protobuf/cmd/protoc-gen-go"
	protoc --proto_path=../sql/src/main/java/com/rilldata/protobuf \
		--go_out=sql/pbast --go_opt=paths=source_relative \
		--go_opt=MSqlNodeProto.proto=github.com/rilldata/rill/runtime/sql/pbast \
		SqlNodeProto.proto

release/darwin-amd64:
	if [ "$(shell uname -s | tr '[:upper:]' '[:lower:]')" != "darwin" ]; then echo "Error: must run build on darwin"; false; fi
	mkdir -p release
	GOOS=darwin GOARCH=amd64 go generate ./sql
	CGO_ENABLED=1 GOOS=darwin GOARCH=amd64 \
		go build -trimpath -o release/darwin-amd64 ./cmd

release/darwin-arm64:
	if [ "$(shell uname -s | tr '[:upper:]' '[:lower:]')" != "darwin" ]; then echo "Error: must run build on darwin"; false; fi
	mkdir -p release
	GOOS=darwin GOARCH=arm64 go generate ./sql
	CGO_ENABLED=1 GOOS=darwin GOARCH=arm64 \
		go build -trimpath -o release/darwin-arm64 ./cmd

release/linux-amd64:
	if [ "$(shell uname -s | tr '[:upper:]' '[:lower:]')" != "linux" ]; then echo "Error: must run build on linux"; false; fi
	mkdir -p release
	GOOS=linux GOARCH=amd64 go generate ./sql
	CGO_ENABLED=1 GOOS=linux GOARCH=amd64 \
		go build -trimpath -o release/linux-amd64 ./cmd

# release/windows-amd64.exe:
# 	mkdir -p release
# 	GOOS=windows GOARCH=amd64 ./scripts/setup_sql.sh -f
# 	CGO_ENABLED=1 GOOS=windows GOARCH=amd64 \
# 		CC="zig cc -target x86_64-windows-gnu" \
# 		CXX="zig c++ -target x86_64-windows-gnu" \
# 		go build -trimpath -o release/windows-amd64.exe ./cmd

# NOTE: A previous version of this Makefile also used Zig for cross-platform macOS and Linux builds.
# It might be worth doing that again in the future. The status is:
# - for darwin, the zig issues linked here need to be solved: https://github.com/rilldata/rill-developer/pull/846
# - for linux, there was a problem with linking to libstdc++ when using the precompiled static libraries in `go-duckdb` (probably an easy fix)
# - for windows, the Zig build appears to work
