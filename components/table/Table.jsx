import './table.scss'

export default function Table({children}) {
  return (
    <table className='table'>
      {children}
    </table>
  )
}