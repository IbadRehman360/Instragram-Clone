import PropTypes from "prop-types";

export default function Image({ src, caption }) {
  return (
    <img
      src={
        "https://th.bing.com/th/id/R.b5b45a56f38e33ad91d74f1ebaca840a?rik=97hxPU1T4GKZxA&pid=ImgRaw&r=0"
      }
      alt={caption}
    />
  );
}
