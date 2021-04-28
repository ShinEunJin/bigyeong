# 훈수방

side project of node.js

## stack

express.js

### 작업 상황

댓글 입력후 등록될때 x 표시가 없다, 그리고 삭제를 눌러도 바로 사라지지 않는다. useEffect에 deps에 onDelete 함수를
넣으면 똑같이 무한반복 된다.

#### 기록

##### 기타사항

babel-node 사용중
배포할때는 babel/cli 사용 + webpack
