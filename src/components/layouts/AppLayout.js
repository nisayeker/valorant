
import { AppShell, Header, MediaQuery, Navbar, Text, useMantineTheme, Burger, Group, ThemeIcon, UnstyledButton, Box, ActionIcon, Menu } from '@mantine/core'
import { BrandInstagram, BrandWalmart, BuildingCastle, Cards, Home, Language, Map, MoonStars, PencilPlus, PlaystationCircle, Prescription, Sun, User } from 'tabler-icons-react';

import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contex';
import { useTranslation } from 'react-i18next';

function MainLink({ icon, color, label, target }) {

    const navigate = useNavigate()

    return (
        <UnstyledButton
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                '&:hover': {
                    backgroundColor: theme.colors.dark[6]
                }
            })}
            onClick={() => navigate(target)}
        >
            <Group>
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>

                <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>
    );
}

function AppLayout() {

    const mantineTheme = useMantineTheme();
    const [opened, setOpened] = useState(false)

    const { setting, setTheme, setLanguage } = useAppContext()

    const { t } = useTranslation()

    const data = [
        { icon: <Home size={16} />, color: 'blue', label: `${t('SidebarHome')}`, target: "" },
        { icon: <User size={16} />, color: 'teal', label: `${t('SidebarAgents')}`, target: "/agent" },
        { icon: <Map size={16} />, color: 'violet', label: `${t('SidebarMaps')}`, target: "/map" },
        { icon: <PencilPlus size={16} />, color: 'grape', label: `${t('SidebarWeapons')}`, target: "/weapon" },
        { icon: <Cards size={16} />, color: 'red', label: `${t('SidebarPlayerCards')}`, target: "/player_card" },
        { icon: <PlaystationCircle size={16} />, color: 'yellow', label: `${t('SidebarBundles')}`, target: "/bundle" }
    ];

    const languages = [
        { label: "AE", value: "ar-AE" },
        { label: "DE", value: "de-DE" },
        { label: "US", value: "en-US" },
        { label: "ES", value: "es-ES" },
        { label: "MX", value: "es-MX" },
        { label: "FR", value: "fr-FR" },
        { label: "ID", value: "id-ID" },
        { label: "IT", value: "it-IT" },
        { label: "JP", value: "ja-JP" },
        { label: "KR", value: "ko-KR" },
        { label: "PL", value: "pl-PL" },
        { label: "BR", value: "pt-BR" },
        { label: "RU", value: "ru-RU" },
        { label: "TH", value: "th-TH" },
        { label: "TR", value: "tr-TR" },
        { label: "VN", value: "vi-VN" },
        { label: "CN", value: "zh-CN" },
        { label: "TW", value: "zh-TW" },
    ];


    return (
        <AppShell
            styles={{
                main: { backgroundColor: mantineTheme.colorScheme === 'dark' ? mantineTheme.colors.dark[8] : mantineTheme.colors.gray[0] }
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <Navbar.Section>
                        <Box
                            sx={(theme) => ({
                                paddingLeft: theme.spacing.xs,
                                paddingRight: theme.spacing.xs,
                                paddingBottom: theme.spacing.lg,
                                borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                            })}
                        >
                            <Group>
                                <ActionIcon variant="default" size={30} onClick={() => setTheme(setting.theme === "light" ? "dark" : "light")}>
                                    {setting.theme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
                                </ActionIcon>

                                <Menu withArrow>
                                    <Menu.Target>
                                        <ActionIcon variant="default" size={30}>
                                            <Language size={16} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Label>{t('Languages')}</Menu.Label>
                                        {
                                            languages.map((language) => <Menu.Item key={language.value} onClick={() => (setLanguage(language.value), window.location.reload(false))}>{language.label}</Menu.Item>)
                                        }
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        </Box>
                    </Navbar.Section>
                    <Navbar.Section grow mt="md">{
                        data.map((link) => <MainLink {...link} key={link.label} />)
                    }</Navbar.Section>
                </Navbar>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={mantineTheme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <Text style={{ display: 'flex', alignItems: 'center' }} fw={900}>VALORANT WIKI</Text>
                    </div>
                </Header>
            }
        >
            <Outlet />
        </AppShell>
    )
}

export default AppLayout