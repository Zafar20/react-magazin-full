import ContentLoader from "react-content-loader"

const Skeleton = () => {
  return (
    <ContentLoader 
    speed={2}
    width={330}
    height={350}
    viewBox="0 0 330 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="50" cy="70" r="50" /> 
    <rect x="0" y="133" rx="0" ry="0" width="120" height="20" /> 
    <rect x="0" y="163" rx="0" ry="0" width="170" height="20" /> 
    <rect x="0" y="218" rx="0" ry="0" width="100" height="20" /> 
    <rect x="0" y="253" rx="0" ry="0" width="100" height="20" /> 
    <rect x="0" y="289" rx="0" ry="0" width="100" height="20" />
  </ContentLoader>
  )
}

export default Skeleton