import { someFunction } from './non-existent-file'; // 존재하지 않는 파일에서 import
import SomeComponent from './SomeComponent.jsx'; // .jsx 확장자 사용
import { foo } from 'module';
import { bar } from 'module';
import { useState } from 'react';
<img src="image.jpg" /> // alt 속성 누락
<div onClick={() => {}} /> // 키보드 이벤트 누락
<a onClick={handleClick}>Click me</a> // href 속성 누락
const items = ['a', 'b', 'c'];
return (
  <ul>
    {items.map(item => <li>{item}</li>)} // key prop 누락
  </ul>
);
class MyComponent extends React.Component {
  state = {
    unusedState: 'value'
  };

  render() {
    return <div>Hello</div>;
  }
}
const MyComponent2 = (props) => {
  if (props.condition) {
    const [state, setState] = useState(null); // 조건부 Hook 사용
  }
  return <div>Hello</div>;
};
useEffect(() => {
  console.log(count);
}, []); // 의존성 배열에 count 누락