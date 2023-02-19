import { Container, LoadingOverlay, Stack, Card, Image, Group, Text, Badge, Button, Grid, BackgroundImage, Avatar, SimpleGrid } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'
import { getApi } from '../../api/valorantApi'
import { useAppContext } from '../../contex'


function List() {

    const [agents, setAgents] = useState([])
    const [isLoading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { setting } = useAppContext()

    const { t } = useTranslation()


    useEffect(() => {

        const fetchData = async () => {
            const res = await getApi(`/agents?isPlayableCharacter=true&language=${setting.language}`)
            setAgents(res.data)
            setLoading(false)
        }

        fetchData();

    }, [])

    return (
        <Stack>
            {isLoading ? (
                <>
                    <LoadingOverlay visible={true} />
                </>
            ) : (
                <Stack>
                    <SimpleGrid cols={5} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 2 }, { maxWidth: 'xs', cols: 1 }, { maxWidth: 'md', cols: 2 }, { maxWidth: 'lg', cols: 3 }, { maxWidth: 'xl', cols: 4 }]}>
                        {
                            agents?.map((agent) => (

                                <Card shadow="sm" p="lg" radius="md" withBorder key={agent.uuid}>
                                    <Card.Section>
                                        <BackgroundImage src={agent.background} m="md">
                                            <Image onClick={() => navigate('detail', {
                                                state: {
                                                    agentId: agent.uuid,
                                                }
                                            })}
                                                src={agent.fullPortrait}
                                                alt="Norway"
                                                sx={{ "&:hover": { scale: "1.2" }, transition: "all linear 400ms", cursor: "pointer" }}
                                            />
                                        </BackgroundImage>

                                    </Card.Section>

                                    <Group position="apart" mt="md" mb="xs">
                                        <Text weight={500} align="center">{agent.displayName}</Text>
                                        <Badge color="dark" variant="light">
                                            <Avatar src={agent.role?.displayIcon} alt="it's me" />

                                        </Badge>
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