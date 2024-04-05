import {
  AppShell,
  Burger,
  Grid,
  Stack,
  Title,
  Group,
  Space,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { variant } from "@effector/reflect";

import {
  YearFilter,
  AutoChange,
  WinningFilter,
  AwardFilter,
} from "./features/filters";
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
          <Grid>
            <Grid.Col span="content">
              <AutoChange />
            </Grid.Col>
            <Grid.Col span="auto">
              <YearFilter />
            </Grid.Col>
            <Grid.Col span={12}>
              <Space h="lg" />
            </Grid.Col>
            <Grid.Col span={12}>
              <Divider />
            </Grid.Col>
            <Grid.Col span={12}>
              <Stack>
                <WinningFilter />
                <AwardFilter />
              </Stack>
            </Grid.Col>
            <Grid.Col span={12}>
              <Divider />
            </Grid.Col>
            <Grid.Col span={12}>
              <InfoButton />
            </Grid.Col>
          </Grid>
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
          <Grid>
            <Grid.Col span="content">
              <AutoChange />
            </Grid.Col>
            <Grid.Col span="auto">
              <YearFilter />
            </Grid.Col>
          </Grid>
        </AppShell.Main>
      </AppShell>
      <InfoModal />
    </>
  );
}

const App = variant({ if: mobile.$matches, then: MobileApp, else: DesktopApp });

export default App;
