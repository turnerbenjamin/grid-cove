import { Link } from "react-router-dom";

import Button from "./Button";
import RenderedErrors from "./RenderedErrors";

export default function ErrorPage({ errors }) {
  return (
    <div className="flex flex-col items-center mt-[5vh]">
      <h3 className="text-2xl text-grid-red mb-6">Whoops</h3>
      <p>Sorry we have experienced an error. See details below:</p>
      <RenderedErrors errors={errors} />
      <Link to="/">
        <Button className="mt-8">Return Home</Button>
      </Link>
    </div>
  );
}
