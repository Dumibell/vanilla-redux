# Redux

## 1. 등장 배경
- props drilling문제 해결
- state 변경 관리할 때 사용
  
## 2. Design Pattern
- 패턴은 되풀이되는 사건이나 물체의 형태를 말한다.
- 그렇다면 디자인패턴이란? 설계 간 자주 말생하는 문제에 대한 모범 답안이 될 수 있다.
- 프로그램을 개발하면서 생기는 문제점들에 대해서 해결할 수 있는 방법을 도출하고 그를 패턴화해둔 것이 Design Pattern이다.

  ### 1. MVC 패턴
  ![MVC](https://github.com/Dumibell/vanilla-redux/assets/100185602/e8216cfa-edfb-46d0-8aef-b372ce841a9e)

    프로젝트의 구성 요소를 역할에 따라 Model, View, Controller 세가지로 나눠서 관리하는 패턴이다.
    - Model은 데이터를 관리하는 역할이다.
    - View 사용자에게 보여지는 UI를 담당한다.
    - Controller는 사용자의 액션에 의해 이벤트를 감지하고 처리하는 역할. 즉, 모델 또는 뷰를 업데이트하는 로직을 담당한다.
      
  => 각 구성요소들의 관심사의 분리가 잘 이루어져있어 유지보수 및 확장이 용이하다.

  MVC의 한계: 양방향 데이터 흐름으로 연쇄적인 데이터 변화가 발생한다. 따라서 model 하나에 문제가 발생했을 때 어디서부터 시작된지 알 수 없다.<br/>
  ex) 페이스북 메시지 시스템에서 안읽은 메시지가 있다는 표시가 뜨는데 실제로 들어가보면 안읽은 메시지가 없는 버그가 발생했었다. mvc의 양방향성으로 인해 발생하는 연쇄적인 변화로 어디서 문제가 발생했는지 모른다는 문제점이 있다.


  ### 2. FLUX 패턴
  ![FLUX](https://github.com/Dumibell/vanilla-redux/assets/100185602/d38f9e35-92d4-42d3-9ce6-d4f5f2c4b520)

  MVC의 문제점을 보완했다. 가장 큰 차이점은 데이터의 흐름이 단방향이라는 것이다.
  - Action: 어떤 변화를 일으키고 싶은지 설명하는 단순한 자바스크립트 객체이다.
  - Dispatcher: 액션을 받아서 스토어에 전달하는 역할을 한다.
  - Store: 데이터의 저장소 역할을 하며, Dispatch로 전달받은 Action에 따라서만 데이터를 변경하고, 그 외의 변경은 허용하지 않는다.
  - View: 데이터를 UI로 표현하는 역할을 하며, Store를 구독하고 있다가 데이터가 변경되면 UI에 반영한다.


## 3. Redux
- 단방향 데이터 흐름을 통해 예측이 가능하며, 일관적인 상태 컨테이너의 역할을 제공하는 라이브러리이다.
- FLUX 패턴에 영감을 받아 개발했다.
- 리액트 또는 다른 뷰 라이브러리들과 함께 사용이 가능하다.

  ### 1. Redux의 원칙
  1. Single source of truth
     - 애플리케이션의 모든 상태(state)는 하나의 저장소(store) 안에 하나의 객체 트리구조로 저장된다.
     - 여러 개의 저장소를 저장 관리 하는 것이 아니라, 단 하나의 자바스크립트 객체로만 데이터를 저장한다.
  2. State is read only
     - store에 직접 접근해서 state를 수정할 수 없다.
     - state를 수정할 수 있는 유일한 방법은 action 객체를 dispatch를 통해 전달하는 것이다.
  3. Changes are made with pure functions
     - 리덕스 state의 유일한 변경 방법은 action 객체를 dispatch를 통해 store에 전달하는 것이다.
     - 전달된 action을 통해 state를 변경해야 하는데 이 때 모든 변화는 순수함수(사이드 이팩트가 없는 함수. 같은 inpu에 대해 같은 output을 보장할 수 있는 상태의 변화를 예측할 수 있는 함수)로 작정되어야 한다.
     - 리덕스에서 state의 변화를 책임지는 순수함수를 Reducer라고 부른다. 이전의 state와 action 객체를 Input으로 받아 새로운 state를 return한다.

### 2. Redux의 구조
1. Action
   - 항상 객체여야 한다.
   - type을 필수적으로 가진다.
2. Reducer
   - state와 action을 매개변수로 받는다.
   - 받아온 현재 state에 action을 적용한 새로운 state 를 리턴해주는 함수이다. 따라서 state가 배열이나 객체일 경우 mutate를 할 수 없다.
     ex)
     ```js
     state.push(action.text) // 이런식으로 mutatate 하면 안되고
     [...state, {text: action.text} ] // 이런 방식으로 원래의 배열을 건들지 않고 새로운 배열을 return 해야 한다. 
     ```
3. Store
   - 스토어는 어플리케이션의 상태가 보관되는 하나의 저장소이다
   - state의 변화를 store에서 감시하고 싶다면 subscribe를 사용한다.

### 3. Redux Toolkit
복잡한 스토어 구성과 코드로 이루어진 Redux를 조금 더 효율적으로 사용하기 위해 만들어졌다.
- Redux와의 차이점
  1. Action
     - createSlice에서 action을 추출할 수 있기 때문에 action을 따로 생성하지 않아도 된다.
  2. Store
     - configureStore로 여러 reducer를 담아 만들어줄 수 있다.
       ```js
       export default configureStore({ reducer: toDos.reducer });
       ```
  3. Reducer
     - 기존의 switch case문을 사용해 action의 type에 따라 나눠주어야 했던 부분들을 createSlice를 사용해 action type, action 생성함수, reducer를 하나의 파일에서 관리할 수 있다.
     - 값을 payload자체로 내보낸다.
     - mutate가 가능한다.(Immer가 내장되어 있어 redux-toolkit은 state의 정보를 가져간다.)


<br/><br/><br/>
*참고<br/>
위코드 강의<br/>
노마드코더 강의*

