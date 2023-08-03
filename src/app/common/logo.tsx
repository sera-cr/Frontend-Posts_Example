import "./common.style.scss";

export default function Logo({
  color,
  fontSize
}: {
  color: string,
  fontSize: string
}) {
  return (
    <h1 className={'logo fw-bold'} style={{
      color: color,
      fontSize: fontSize
    }}>
      Post-That!
    </h1>
  )
}