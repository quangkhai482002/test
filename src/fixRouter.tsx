import { useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

export default function CollectionKeeper() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Các collection hiện có trong URL
    const currentCollections = searchParams.getAll("collection");

    // Nếu không có thì không làm gì
    if (currentCollections.length === 0) return;

    const newParams = new URLSearchParams(searchParams);

    // Nếu vì lý do gì đó bị xóa mất → thêm lại
    const afterChangeCollections = newParams.getAll("collection");

    const missing =
      afterChangeCollections.length === 0 && currentCollections.length > 0;

    if (missing) {
      newParams.delete("collection");
      currentCollections.forEach((c) => newParams.append("collection", c));

      navigate(`${location.pathname}?${newParams.toString()}`, {
        replace: true,
      });
    }
  }, [location]);

  return null; // Component chạy ngầm
}
