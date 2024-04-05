import { Container } from "@mantine/core";

import { YearFilter, AutoChange } from "./features/filters";
import { Heatmap } from "./features/heatmap";

function App() {
  return (
    <Container>
      <YearFilter />
      <AutoChange />
      <Heatmap />
    </Container>
  );
}

export default App;
