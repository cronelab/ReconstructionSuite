import "../styles/App.scss";
import { Container } from "react-bootstrap";
import SSRProvider from 'react-bootstrap/SSRProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Container fluid={true}>
        <Component {...pageProps} />
      </Container>
      </SSRProvider>
  );
}
