
const Button = ({btnType,children}) => {

  return (
    <div className={`btn-base ${btnType}`}>{children}</div>
  )
}

export default Button