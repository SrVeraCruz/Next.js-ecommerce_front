import "./button.scss"


export default function Button({onClick,children, ...p}) {
  const getClassName = () => {
    let curClass=''
    const classes = Object.keys(p)
    classes.map((c) => curClass+=c+' ')

    return curClass;
  }
    
  return (
    <div className="btn">
      <button onClick={onClick} 
        className={getClassName()}
      >
        {children}
      </button>  
    </div>
  )
}