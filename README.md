# 훈수방

side project of node.js

## stack

express.js

### 작업 상황

거의 작업이 완료되었다. 문제가 있다.
findBySearch 에서 스크롤 문제인데 setTimeout걸어놨는데 만약 그 시간이 절묘하게 맞으면
product 페이지에 갔을 때 productsMore reducer로 인해 받은 데이터가 겹치면서 오류가 걸린다.

#### 기록

##### 기타사항

babel-node 사용중
배포할때는 babel/cli 사용 + webpack
