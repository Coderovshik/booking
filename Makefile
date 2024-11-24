run:
	@ go run cmd/api/main.go

migrate:
	@ go run cmd/migration/main.go

gen-mock:
	@mockery --all --dir ./internal/controller --output ./internal/controller/mocks --with-expecter --quiet
	@mockery --all --dir ./internal/service --output ./internal/service/mocks --with-expecter --quiet

test:
	@ go test -v ./...

test-coverage:
	@ go test -coverprofile=var/coverage.out ./...
	@ go tool cover -html=var/coverage.out

start-local-deploy:
	@docker compose up -d

stop-local-deploy:
	@docker compose down

.PHONY: run migrate test