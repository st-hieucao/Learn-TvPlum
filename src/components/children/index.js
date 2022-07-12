import React, { Children, createElement } from 'react';

const Parent = ({title, onClick, children}) => {
  return (
    <>
      {/* Render children       ----------------------------------- */}
      {/* {
        Children.map(children, child => {
          console.log(child)
          return child;
        })
      } */}

      {/* or */} 

      {/* {
        children.map(child => child)
      } */}

      {/* Pass props to child     --------------------------------- */}
      {/* for one component */}
      {/* {
        React.cloneElement(children, {title})
      } */}
      
      {/* for muitiple component */}
      {children.map(child => child.type === Son ? React.cloneElement(child, { title, onClick: () => console.log('click')}): child)}
    </>
)};

const Son = (props) => {
  const { title, onClick } = props;
  return <p onClick={onClick}>Son , {title}</p>
}

const Son2 = (props) => {
  const { title, onClick } = props;
  return <p onClick={onClick}>Son , {title}</p>
}

const LearnChildren = () => {
  return (
    <div>
      <Parent title="Cao Kha Hieu">
        <Son></Son>
        <Son2 name="son2"></Son2>
        <Son></Son>
      </Parent>
    </div>
  )
}

export default LearnChildren;
