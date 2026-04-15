# 🪝 React & Hook

> 2026-04-15 수업 | 레포트 없음

---

## 목차

1. [React를 사용하는 이유](#1-react를-사용하는-이유)
2. [Component](#2-component)
3. [Hook](#3-hook)
4. [useState](#4-usestate)

---

## 실습 내용

- `useState`의 네 가지 활용 예시(Counter, TextField, Form, CheckBox)를 각각 컴포넌트로 제작
- `App.js`에서 한 번에 출력되도록 구성

---

## 1. React를 사용하는 이유

재사용 가능한 컴포넌트들을 활용해 UI를 효율적으로 구성하기 위해 사용한다.

---

## 2. Component

엘리먼트를 만드는 단위. 주로 **함수형 컴포넌트**로 작성한다.

---

## 3. Hook

> 함수형 컴포넌트에서 **상태(state)** 와 **생명주기(lifecycle)** 같은 기능을 사용할 수 있게 해주는 특수한 함수

- **라이프사이클** : 컴포넌트가 만들어지고 소멸될 때까지의 과정
- 기존 함수형 컴포넌트는 state 정의나 생명주기에 맞춘 실행이 불가능했기 때문에 Hook이 등장
- 클래스형 컴포넌트의 단점을 보완하여 함수형 컴포넌트에서도 동일한 기능을 사용 가능하게 한다

### 장점

| 장점 | 설명 |
|------|------|
| 상태 제어 | 상태를 쉽게 제어할 수 있다 |
| 재사용성 | 코드 재사용성과 관심사 분리 |
| 사이드 이펙트 감소 | 렌더링 외의 원치 않는 동작을 줄일 수 있다 |

> **사이드 이펙트** : 컴포넌트가 화면에 렌더링되는 것 외의 동작 (원치 않은 동작)

### 규칙

| # | 규칙 | 설명 |
|---|------|------|
| 1 | 최상위에서만 호출 | 반복문, 조건문, 중첩 함수 내에서 호출 금지 |
| 2 | React 함수 내에서만 호출 | 일반 JS 함수에서 호출 금지 |
| 3 | 이름은 `use`로 시작 | 모든 Hook의 이름은 `use`로 시작 |
| 4 | `return` 뒤에 사용 금지 | `return`은 함수를 끝내므로 그 뒤에 Hook 사용 불가 |
| 5 | 이벤트 핸들러에서 사용 금지 | — |

### 종류

| 분류 | Hook |
|------|------|
| State Hooks | `useState`, `useReducer` |
| Context | `useContext` |
| Custom Hook | 사용자가 필요에 따라 직접 정의 |

---

## 4. useState

> 컴포넌트에 **상태 변수(state variable)** 를 추가할 수 있게 해주는 Hook

```jsx
const [변수명, setState] = useState(initialState)
```

### 기본 예시

```jsx
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
}
```

```jsx
// 초깃값을 0으로 설정 (베스트 프랙티스)
function Counter() {
  const [count, setCount] = useState(0);
}

// 윈도우 기본 사이즈를 초깃값으로 설정
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
}
```

### 활용 예시

| 예시 | 상태 타입 | 설명 |
|------|-----------|------|
| Counter | `number` | `count` 상태 변수로 숫자 유지, 버튼 클릭 시 증가 |
| Text Field | `string` | `text` 상태 변수로 문자열 유지, 입력 시 `setText`로 업데이트 |
| Checkbox | `boolean` | `liked` 변수로 체크 여부 유지, 삼항연산자로 다른 출력 |
| Form | 복합 | 동일 컴포넌트에서 둘 이상의 상태 변수 선언 가능, 각 상태는 완전히 독립적 |