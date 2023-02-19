import { SimpleGrid, Stack, Card, LoadingOverlay, Image, Group, Text, Button } from "@mantine/core"
import { useEffect, useState } from "react"
import { getApi } from "../../api/valorantApi"
import { useAppContext } from "../../contex"

function List() {
    const [playercards, setPlayercards] = useState([])
    const [isLoading, setLoading] = useState(true)
    const { setting } = useAppContext()

    useEffect(() => {
        const fecthData = async () => {
            const res = await getApi(`/playercards?language=${setting.language}`)

            setPlayercards(res.data)
            setLoading(false)
        }

        fecthData();
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
                                playercards?.map((card) => (
                                    <Card shadow="sm" p="lg" radius="md" withBorder key={card.uuid}>
                                        <Card.Section>
                                            <Image p={10} radius="md"
                                                src={card.wideArt}
                                            />

                                        </Card.Section>

                                        <Group position="apart" mt="md" mb="xs">
                                            <Text weight={500} align="center">{card.displayName}</Text>
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


export default List
