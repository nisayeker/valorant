import { Container, LoadingOverlay, Stack, Card, Image, Group, Text, Badge, Button, Grid, BackgroundImage, Avatar, SimpleGrid, Tooltip, Chip } from '@mantine/core'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'
import { getApi } from '../../api/valorantApi'
import { useAppContext } from '../../contex'


function List() {

    const [agents, setAgents] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [roles, setRoles] = useState([])
    const [filter, setFilter] = useState([]);
    const navigate = useNavigate()
    const { setting } = useAppContext()

    const { t } = useTranslation()


    useEffect(() => {

        const fetchData = async () => {
            const res = await getApi(`/agents?isPlayableCharacter=true&language=${setting.language}`)
            setAgents(res.data)
            setLoading(false)
            const allRoles = res.data?.map(a => a.role.displayName)
            setRoles([...new Set(allRoles)])
            setFilter([...new Set(allRoles)])
        }

        fetchData();

    }, [])

    const filteredAgents = useMemo(() => {
        return agents.filter(a => filter.includes(a.role.displayName))
    }, [filter, agents])

    return (
        <Stack>
            {isLoading ? (
                <>
                    <LoadingOverlay visible={true} />
                </>
            ) : (
                <Stack>
                    <>
                        <Group position="center">
                            {roles.map(role => {
                                return (<Chip checked={filter.includes(role)} onClick={() => {
                                    const selectedFilters = [...filter];
                                    if (selectedFilters.includes(role)) {
                                        selectedFilters.splice(selectedFilters.indexOf(role), 1);
                                    } else {
                                        selectedFilters.push(role);
                                    }
                                    setFilter(selectedFilters)
                                }} >{role}</Chip>)
                            })}
                        </Group>
                    </>
                    <SimpleGrid cols={5} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 2 }, { maxWidth: 'xs', cols: 1 }, { maxWidth: 'md', cols: 2 }, { maxWidth: 'lg', cols: 3 }, { maxWidth: 'xl', cols: 4 }]}>
                        {
                            filteredAgents?.map((agent) => (

                                <Card shadow="sm" radius="md" withBorder key={agent.uuid} sx={{ overflow: 'visible' }}>

                                    <Card.Section pos="relative">
                                        <BackgroundImage
                                            pos="absolute"
                                            fit='cover'
                                            opacity="0.5"
                                            src={agent.background}
                                            sx={{
                                                top: "10px",
                                                left: "10px",
                                                bottom: "10px",
                                                right: "10px",
                                                width: "calc(100% - 20px)",
                                            }}
                                        />
                                        <Image
                                            onClick={() => {
                                                navigate('detail', {
                                                    state: {
                                                        agentId: agent.uuid,
                                                    }
                                                })
                                            }}
                                            src={agent.fullPortrait}
                                            alt="Norway"
                                            sx={{ "&:hover": { scale: "1.2" }, transition: "all linear 400ms", cursor: "pointer" }}
                                            styles={{
                                                image: {
                                                    filter: "drop-shadow(0px 0px 70px #000)"
                                                }
                                            }}
                                        />

                                    </Card.Section>

                                    <Group position="apart" mt="md" mb="xs">
                                        <Text weight={500} align="center">{agent.displayName}</Text>
                                        {/* <Badge color="dark" variant="light"> */}
                                        <Tooltip label={agent?.role?.displayName} mr="xs">
                                            <Avatar src={agent.role?.displayIcon} alt="it's me" />
                                        </Tooltip>
                                        {/* </Badge> */}
                                    </Group>

                                    <Text size="sm" color="dimmed" mih={150}>
                                        {agent.description}
                                    </Text>
                                    <Group position='center'>
                                        <Button onClick={() => navigate('detail', {
                                            state: {
                                                agentId: agent.uuid,
                                            }
                                        })} variant="outline" radius="md" color="red" fullWidth>
                                            {t('DetailButton')}
                                        </Button>
                                    </Group>
                                </Card>

                            ))
                        }

                    </SimpleGrid>
                </Stack>
            )}
            <Outlet />
        </Stack>
    )
}


export default List;