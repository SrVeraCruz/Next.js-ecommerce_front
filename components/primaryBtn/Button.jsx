import "./button.scss"


export default function Button({children, ...p}) {
  const className = 
    "button"+' '+
    p["size"]+' '+
    p["primary"]+' '+
    p["white"]+' '+
    p["outline"]
    
  return (
    <div className="btn">
      <button className={className}>{children}</button>  
    </div>
  )
}