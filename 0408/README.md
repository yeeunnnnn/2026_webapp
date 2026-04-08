# ⚛️ Component State

> 2026-04-08 수업 | 레포트 없음

---

## 목차

1. [State](#1-state)
2. [setState](#2-setstate)
3. [동기 vs 비동기](#3-동기-vs-비동기)
4. [React의 setState 동작 방식](#4-react의-setstate-동작-방식)
5. [Class Component에서 State 생성](#5-class-component에서-state-생성)
6. [추가 특징](#6-추가-특징)

---

## 실습 내용

- class Component의 `counter.js` 제작 후 `setState`로 화면에 표현
- `counter.js`를 수정하여 `+` 버튼을 카운트 +1 버튼으로 변경, `index.js` 출력 수정

---

## 1. State

> **렌더링 결과물에 영향을 주는 정보 (변수)**

일반 변수(`const`, `let`)와 달리 **값이 변경되면 컴포넌트가 다시 렌더링**된다.

| 특징 | 설명 |
|------|------|
| 역할 | 화면(UI)을 변경하는 데이터 변수 |
| 위치 | 컴포넌트 내부에 존재 |
| 변경 시 | 컴포넌트가 재렌더링(Re-rendering) |
| 주의 | 불필요한 값을 state로 관리하면 성능 저하 발생 가능 |

React에서는 **명시적으로 state를 선언해야 사용 가능**하며, 쉽게 말해 **컴포넌트가 가지고 있는 데이터**다.

---

## 2. setState

> **state 값을 변경하는 함수**

state를 직접 변경하는 것이 아니라 **반드시 `setState`를 통해 변경해야 한다.**

| 특징 | 설명 |
|------|------|
| 동작 방식 | 비동기적으로 작동 |
| Batching | 여러 state 변경을 한 번에 모아서 처리 |

### 주의 예시

```jsx
this.setState({ count: 1 });
console.log(this.state.count); // 0이 출력될 수 있다
```

`setState`가 **비동기적으로 동작**하기 때문에, 호출 직후 `console.log`는 변경 전 값을 출력한다.

---

## 3. 동기 vs 비동기

| 구분 | 설명 | 비유 |
|------|------|------|
| **동기 (Synchronous)** | 작업이 순서대로 실행, 이전 작업이 끝나야 다음 작업 실행 | 일을 시켜놓고 결과 보고를 받은 뒤 다음 일을 시킨다 |
| **비동기 (Asynchronous)** | 작업이 동시에 진행될 수 있음, 결과를 기다리지 않고 다음 작업 실행 | 일을 시켜놓고 나는 다른 일을 한다 |

---

## 4. React의 setState 동작 방식

React는 약 **16ms 동안 state 변경을 모아서 한 번에 렌더링**한다.

```
state 변경 요청
↓
16ms 동안 변경 사항 수집
↓
한 번에 렌더링
```

| 시점 | 결과 |
|------|------|
| `setState` 직후 `console.log` | 이전 값 출력 |
| 렌더링 이후 | 변경된 값 반영 |

---

## 5. Class Component에서 State 생성

Class Component에서는 **`constructor`에서 state를 초기화**해야 한다.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
}
```

- `constructor`에서 **state를 직접 정의**해야 한다.
- 이 시점에서 설정한 값이 **state의 기본값(initial state)** 이 된다.

---

## 6. 추가 특징

### 비구조 할당 사용 가능

```jsx
const { date } = this.state;
```

### state 직접 수정 금지

```jsx
// ❌ 잘못된 방식
this.state.date = new Date();

// ✅ 올바른 방식
this.setState({ date: new Date() });
```

---

## 핵심 정리

| 개념 | 설명 |
|------|------|
| State | 컴포넌트의 상태 데이터 |
| 역할 | 화면(UI)에 영향을 주는 데이터 |
| 특징 | 값이 변경되면 컴포넌트 재렌더링 |
| setState | state 값을 변경하는 함수 |
| 동작 | 비동기 처리 + 변경 사항 Batching |
| Class Component | `constructor`에서 state 초기화 |