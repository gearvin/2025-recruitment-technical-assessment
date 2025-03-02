import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: cookbookEntry[] = [];

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  // TODO: implement me
  // if (recipeName.length === 0) return null;
  recipeName = recipeName.replace(/[-_]/g, " ");
  recipeName = recipeName.replace(/[^A-Za-z\s]/g, "");
  recipeName = recipeName
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  recipeName = recipeName.replace(/\s\s+/g, " ");

  if (recipeName.length === 0) return null;
  return recipeName;
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  // TODO: implement me
  const newEntry = req.body;
  if (newEntry.type !== "recipe" && newEntry.type !== "ingredient") {
    res.status(400).send("type can only be recipe or ingredient.");
    return;
  }
  if (newEntry.cookTime < 0) {
    res.status(400).send("cookTime can only be greater than or equal to 0.");
    return;
  }
  if (cookbook.some(entry => entry.name === newEntry.name)) {
    res.status(400).send("entry names must be unique");
    return;
  }
  if (newEntry.type === "recipe" && hasDuplicateNames(newEntry)) {
    res.status(400).send("Recipe requiredItems can only have one element per name.");
    return;
  }
  
  cookbook.push(newEntry);
  res.status(200).send();
});

// checks if recipe has recipeItems with duplicate names
const hasDuplicateNames = (recipe: recipe) => {
  const names = recipe.requiredItems.map(item => item.name);
  const uniqueNames = new Set(names);
  return names.length !== uniqueNames.size;
}

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  // TODO: implement me
  const name = req.query.name;
  const recipe = cookbook.find(entry => entry.type === "recipe" && entry.name === name) as recipe;
  if (!recipe) {
    res.status(400).send("A recipe with the corresponding name cannot be found.");
    return;
  }

  try {
    const result = summaryHelper(cookbook.find(entry => entry.type === "recipe" && entry.name === name), 1, 0, []);
    const {cookTime, ingredients} = result;

    res.status(200).json({
      name,
      cookTime,
      ingredients,
    });
    
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// a recursive helper function that returns the cookTime and ingredient list 
// of a recipe
const summaryHelper = (entry: cookbookEntry, quantity: number,
        cookTime: number = 0, ingredients: requiredItem[] = []) => {
  if (entry.type === "ingredient") {
    const ingredientEntry = entry as ingredient;
    const ingredient = ingredients.find(ingredient => ingredient.name === entry.name);
    
    // update quantity if ingredient already in list
    if (ingredient) {
      ingredient.quantity += quantity;
    } else {
      ingredients.push({name: entry.name, quantity});
    }
    cookTime += ingredientEntry.cookTime * quantity;
  } else {
    const recipe = entry as recipe;
    
    for (const item of recipe.requiredItems) {
      const itemEntry = cookbook.find(entry => entry.name === item.name);
      if (!itemEntry) {
        throw new Error("The recipe contains recipes or ingredients that aren't in the cookbook.");
      }

      // recurse on other recipes, and update cookTime and ingredients
      const result = summaryHelper(itemEntry, item.quantity * quantity, cookTime, ingredients);
      cookTime = result.cookTime;
      ingredients = result.ingredients;
    }
  }

  return {cookTime, ingredients};
  
}

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
