import ContentLoader from "react-content-loader"

const Skeleton = () => {
  return (
    <ContentLoader 
    speed={1}
    width="100%"
    height="100%"
    viewBox="0 0 440 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="20" ry="20" width="440" height="200" /> 
    <rect x="0" y="215" rx="0" ry="0" width="150" height="25" /> 
    <rect x="0" y="250" rx="0" ry="0" width="200" height="25" />
  </ContentLoader>
  )
}

export default Skeleton