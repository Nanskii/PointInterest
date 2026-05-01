import { useState, type FormEvent } from "react";
import { Heart, MapPin, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORY_META, type Place } from "../data/places";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Props {
  place: Place | null;
  isFavorite: boolean;
  reviews: Review[];
  onToggleFavorite: (id: string) => void;
  onAddReview: (placeId: string, review: Review) => void;
  onClose: () => void;
}

// Simple interactive star input
function StarInput({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-6 h-6 ${
              n <= (hover || value) ? "fill-orange-500 text-orange-500" : "text-neutral-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function PlaceDetail({
  place, isFavorite, reviews, onToggleFavorite, onAddReview, onClose,
}: Props) {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Average reviewer rating (separate from the seeded place.rating)
  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : null;

  const submitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!place || !comment.trim() || rating === 0) return;
    onAddReview(place.id, {
      id: `r-${Date.now()}`,
      author: author.trim() || "Anonim",
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString(),
    });
    setAuthor(""); setComment(""); setRating(0);
  };

  return (
    <AnimatePresence>
      {place && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-[1000] flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white dark:bg-neutral-900 w-full md:max-w-lg max-h-[90vh] flex flex-col rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 shrink-0">
              <ImageWithFallback src={place.image} alt={place.name} className="w-full h-full object-cover" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
              <span
                className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm text-white"
                style={{ backgroundColor: CATEGORY_META[place.category].color }}
              >
                {CATEGORY_META[place.category].emoji} {CATEGORY_META[place.category].label}
              </span>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-neutral-900 dark:text-neutral-100">{place.name}</h2>
                <button
                  onClick={() => onToggleFavorite(place.id)}
                  className="shrink-0 w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-orange-50 dark:hover:bg-neutral-800"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-orange-500 text-orange-500" : "text-neutral-600"}`} />
                </button>
              </div>
              <div className="flex items-center gap-3 text-sm mb-4">
                <span className="flex items-center gap-1 text-orange-500">
                  <Star className="w-4 h-4 fill-orange-500" /> {place.rating || (avg?.toFixed(1) ?? "—")}
                </span>
                {avg !== null && (
                  <span className="text-xs text-neutral-500">({reviews.length} ulasan)</span>
                )}
                <span className="text-neutral-300">|</span>
                <span className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300">
                  <MapPin className="w-4 h-4" /> {place.region}
                </span>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">{place.description}</p>
              <div className="bg-green-50 dark:bg-green-950/40 rounded-xl p-3 mb-4">
                <div className="text-xs text-green-700 dark:text-green-300 mb-1">Alamat</div>
                <div className="text-sm text-neutral-800 dark:text-neutral-200">{place.address}</div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {place.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Reviews list */}
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
                <h3 className="mb-3 text-neutral-900 dark:text-neutral-100">Ulasan ({reviews.length})</h3>
                <div className="space-y-3 mb-4">
                  {reviews.length === 0 && (
                    <p className="text-sm text-neutral-500">Belum ada ulasan — jadilah yang pertama!</p>
                  )}
                  {reviews.map((r) => (
                    <div key={r.id} className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-neutral-900 dark:text-neutral-100">{r.author}</span>
                        <span className="text-xs text-neutral-500">{r.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={`w-3.5 h-3.5 ${
                              n <= r.rating ? "fill-orange-500 text-orange-500" : "text-neutral-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">{r.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Review form */}
                <form onSubmit={submitReview} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">Rating kamu</span>
                    <StarInput value={rating} onChange={setRating} />
                  </div>
                  <input
                    placeholder="Nama kamu"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900"
                  />
                  <textarea
                    placeholder="Bagikan pengalamanmu..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 h-20 resize-none rounded-lg border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900"
                  />
                  <button
                    type="submit"
                    disabled={!comment.trim() || rating === 0}
                    className="w-full py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Kirim ulasan
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
