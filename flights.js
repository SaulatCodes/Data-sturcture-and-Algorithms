function findCheapestPath(airports, start, end) {
  // This array will hold all the possible paths and their associated costs
  let paths = [];

  // Recursive function to explore all possible routes from the current airport
  function findPaths(currentAirport, currentPath, currentCost) {
    // Base case: if the current airport is the destination, store the path and its total cost
    if (currentAirport === end) {
      // Add the current path (including the current airport) and its total cost to paths array
      paths.push({ path: [...currentPath, currentAirport], cost: currentCost });
      return; // Return since we have reached the destination
    }

    // Loop through all available routes (connections) from the list of airports
    for (let route of airports) {
      // Check if the current route starts at the current airport
      // Also, ensure the next airport is not already in the path (to avoid cycles)
      if (route.start === currentAirport && !currentPath.includes(route.end)) {
        // Recursively call findPaths to explore the next airport (route.end)
        // Update the current path by adding the current airport, and add the route cost to the currentCost
        findPaths(
          route.end,
          [...currentPath, currentAirport],
          currentCost + route.cost
        );
      }
    }
  }

  // Start searching from the 'start' airport
  // Initially, the path is empty, and the total cost is zero
  findPaths(start, [], 0);

  // Check if any valid paths were found
  if (paths.length === 0) {
    return { path: [], cost: Infinity }; // Return an empty path and an infinite cost if no route was found
  }

  // Initialize the cheapest path as the first one in the paths array
  let cheapestPath = paths[0];

  // Loop through all found paths and find the one with the lowest cost
  for (let path of paths) {
    if (path.cost < cheapestPath.cost) {
      cheapestPath = path; // Update the cheapestPath if a cheaper path is found
    }
  }

  // Return the cheapest path and its total cost
  return cheapestPath;
}

// Example usage of the function with a list of routes between airports
const airports = [
  { start: "ISB", end: "LHR", cost: 1000 },
  { start: "LHR", end: "NYC", cost: 750 },
  { start: "CBS", end: "NYC", cost: 775 },
  { start: "ISB", end: "CBS", cost: 575 },
  { start: "CBS", end: "GRC", cost: 731 },
  { start: "NYC", end: "GRC", cost: 459 },
];

// Test the function with a start point of 'ISB' and an end point of 'NYC'
const result = findCheapestPath(airports, "ISB", "NYC");

// Output the result: the cheapest path and the total cost
console.log("Cheapest path:", result.path); // Logs the path with the lowest cost
console.log("Total cost:", result.cost); // Logs the total cost of the cheapest path
