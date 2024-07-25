import ContentLoader from "react-content-loader"

const Skeleton = () => {
  return (
    <ContentLoader 
    speed={1}
    width="100%"
    height="100%"
    viewBox="0 0 1400 440"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="450" height="50" /> 
    <rect x="1250" y="0" rx="20" ry="20" width="150" height="50" /> 
    <rect x="0" y="90" rx="0" ry="0" width="1400" height="350" />
  </ContentLoader>
  )
}

export default Skeleton