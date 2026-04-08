// // import React from 'react';

// // const Counter = () => {
// //     let count = 0;
// //     const plus = () => {
// //         count = count + 1
// //         console.log(count); // 제대로 증가함
// //     }
// //     const minus = () => {
// //         count = count - 1
// //         console.log(count);
// //     }
// //     return (
// //         <div className='container' style={{ margin: 15 }}>
// //             <h2 className='int'>{count}</h2>
// //             <button className='plus' onClick={plus}>+</button>
// //             <button className='minus' onClick={minus}>-</button>
// //         </div>
// //     )
// // }
// // export default Counter;

// import { useState } from 'react';

// const Counter = () => {
//     const [count, setCount] = useState(0);      // [스테이트명, 스테이트 바꾸는 함수 명] = useState(0) : 스테이트의 초깃값
//     console.log(count);
//     const plus = () => {
//         setCount(count + 1);
//     }
//     const minus = () => {
//         setCount(count - 1);
//     }
//     return (
//         <div className='container'>
//             <h2 className='int'>{count}</h2>
//             <button className='plus' onClick={plus}>+</button>
//             <button className='minus' onClick={minus}>-</button>
//         </div>
//     )
// }
// export default Counter;

import React, { Component } from 'react';
class Counter extends Component {
    constructor(props) {
        super(props);
        // state 초기값 설정
        this.state = {
            count: 0
        };
    }
    render() {
        const { count } = this.state;
        return (
            <div>
                <h2>현재 Count : {count}</h2>
                <button onClick={() => {
                    this.setState({ count: count + 1 })
                }}>카운트 +1</button>
            </div>
        );
    }
}
export default Counter;