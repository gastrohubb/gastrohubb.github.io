0. check routing at 
   cat ./src/app/service/config.service.ts
1. run `ng build`
2. rm -r ./docs/*
3. cp ./dist/gastrohubb/pl-PL/index.html ./docs/404.html
4. cp -r ./dist/gastrohubb/* ./docs/
5. git log --pretty=format:"%ad %an %h %s"
6. git add *
7. git commit -m '[RELEASE 0.1.0] - GHB-137 Validates and resizes images on uploading'
8. git push
