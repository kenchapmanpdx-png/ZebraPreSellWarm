import { useRoute } from "wouter";
import { ingredients } from "@/data/ingredients";
import IngredientDetail from "@/components/IngredientDetail";
import NotFound from "./not-found";

export default function IngredientPage() {
    const [, params] = useRoute("/ingredients/:id");
    const id = params?.id;

    const ingredient = id ? ingredients[id] : null;

    if (!ingredient) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-[#EBE8E1]">
            {/* Optional: Add navigation or breadcrumbs here */}
            <IngredientDetail data={ingredient} />
        </div>
    );
}
