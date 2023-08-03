import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export function Loading() {
  const loadingStyles = {
    textAlign: "center",
    margin: "20%",
  };
  const styles = {
    marginTop: "1px",
    color: "#CAA344",
    fontWeight:'bolder'
  };
  return (
    <div style={loadingStyles}>
      <Button variant="warning" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>
      <h6 style={styles}>Loading...</h6>
    </div>
  );
}
