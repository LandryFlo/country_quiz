import Loader from "react-loader-spinner";

const Loading = () => (
  <div className="section">
    <div className="container has-text-centered">
      <Loader
        type="ThreeDots"
        color="#FFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  </div>
); 

export default Loading; 