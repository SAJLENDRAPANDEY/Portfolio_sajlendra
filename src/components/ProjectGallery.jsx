import { useState } from 'react'
import './ProjectGallery.css'

// One thumbnail in the gallery grid. Shows a skeleton shimmer until the
// real image finishes loading, and a friendly "no screenshot yet"
// placeholder if the image is missing/404s (e.g. before you've added
// your real screenshots to /public/projects/<id>/).
function GalleryThumb({ image, onOpen }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <button
      type="button"
      className="pg-thumb"
      onClick={() => onOpen(image)}
      aria-label={`Preview screenshot: ${image.label}`}
    >
      {!loaded && !errored && <span className="pg-skeleton" aria-hidden="true" />}

      {!errored ? (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className={`pg-img${loaded ? ' pg-img-loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="pg-placeholder">
          <i className="fas fa-image" aria-hidden="true" />
          <span>Screenshot coming soon</span>
        </div>
      )}

      <span className="pg-thumb-label">
        <i className="fas fa-up-right-and-down-left-from-center" aria-hidden="true" /> {image.label}
      </span>
    </button>
  )
}

// Simple lightbox overlay for a full-size preview of the clicked image.
function Lightbox({ image, onClose }) {
  if (!image) return null
  return (
    <div className="pg-lightbox" role="dialog" aria-modal="true" aria-label={image.label} onClick={onClose}>
      <button className="pg-lightbox-close" onClick={onClose} aria-label="Close preview">
        <i className="fas fa-xmark" />
      </button>
      <img src={image.src} alt={image.alt} className="pg-lightbox-img" onClick={(e) => e.stopPropagation()} />
      <span className="pg-lightbox-caption">{image.label}</span>
    </div>
  )
}

export default function ProjectGallery({ images }) {
  const [active, setActive] = useState(null)

  if (!images || images.length === 0) return null

  return (
    <>
      <div className="pg-grid">
        {images.map((img) => (
          <GalleryThumb key={img.src} image={img} onOpen={setActive} />
        ))}
      </div>
      <Lightbox image={active} onClose={() => setActive(null)} />
    </>
  )
}
