# tripple-project
## 1. Getting Start
1. Clone project
	```shell
	git clone https://github.com/whitekiwi/tripple-project
	```
2. Setup Environment
	```shell
	docker-compose -f ./test/docker-compose.yml up -d
	```
3. Start Server
	```shell
	yarn run start
	```

## 2. Test
```shell
# unit test
yarn run test

# e2e test
yarn run test:e2e
```