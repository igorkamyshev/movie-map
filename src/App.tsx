import {
  AppShell,
  Burger,
  Stack,
  Title,
  Group,
  Space,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { variant } from "@effector/reflect";

import { YearFilter, WinningFilter, AwardFilter } from "./features/filters";
import { Heatmap } from "./features/heatmap";
import { InfoButton, InfoModal } from "./features/info";
import { mobile } from "./services/breakpoints";

function MobileApp() {
  return (
    <>
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <Group h="100%" px="md">
            <Title order={1}>Карта кино</Title>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <Heatmap />
          <Stack>
            <Space h="lg" />
            <YearFilter />
            <Divider />
            <WinningFilter />
            <AwardFilter />
            <Divider />
            <InfoButton />
            <Space h="lg" />
          </Stack>
        </AppShell.Main>
      </AppShell>
      <InfoModal />
    </>
  );
}

function DesktopApp() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={1}>Карта кино</Title>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Stack justify="space-between" h="100%">
            <Stack>
              <WinningFilter />
              <AwardFilter />
            </Stack>
            <InfoButton />
          </Stack>
        </AppShell.Navbar>
        <AppShell.Main>
          <Heatmap />
          <Space h="lg" />
          <YearFilter />
        </AppShell.Main>
      </AppShell>
      <InfoModal />
    </>
  );
}

const App = variant({ if: mobile.$matches, then: MobileApp, else: DesktopApp });

export default App;
