import { Modal, BackgroundImage, Image, Card, Skeleton, Grid, Container, SimpleGrid, useMantineTheme, Stack, Text, Tabs, Avatar, Group, LoadingOverlay } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getApi } from '../../api/valorantApi'
import { useAppContext } from '../../contex';

function Detail() {

    const { state } = useLocation();
    const [detail, setDetail] = useState([])
    const [isLoading, setLoading] = useState(true)
    const { setting } = useAppContext()

    useEffect(() => {
        const fetchData = async () => {
            const res = await  getApi(`/weapons/${state.weaponId}?language=${setting.language}`)
            setDetail(res.data)
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
            ) :
                (
                    <Stack>
                        <SimpleGrid cols={5} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 2 }, { maxWidth: 'xs', cols: 1 }, { maxWidth: 'md', cols: 2 }, { maxWidth: 'lg', cols: 3 }, { maxWidth: 'xl', cols: 4 }]}>
                            {
                                detail?.skins.map((weapon) => (
                                    <Card shadow="sm" p="lg" radius="md" withBorder key={weapon.uuid}>
                                        <Card.Section>
                                            <Image p={10}
                                                src={weapon.displayIcon}
                                            />

                                        </Card.Section>

                                        <Group position="apart" mt="md" mb="xs">
                                            <Text weight={500} align="center">{weapon.displayName}</Text>
                                        </Group>
                                    </Card>
                                ))
                            }
                        </SimpleGrid>
                    </Stack>
                )
            }
        </Stack>
    )
}

export default Detail