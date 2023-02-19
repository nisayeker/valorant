import { SimpleGrid, Stack, Card, LoadingOverlay, Image, Group, Text, Button } from "@mantine/core"
import { useEffect, useState } from "react"
import { getApi } from "../../api/valorantApi"
import { useAppContext } from "../../contex"

function List() {
    const [bundles, setBundles] = useState([])
    const [isLoading, setLoading] = useState(true)
    const { setting } = useAppContext()

    useEffect(() => {
        const fecthData = async () => {
            const res = await getApi(`/bundles?language=${setting.language}`)

            setBundles(res.data)
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
                                bundles?.map((bundle) => (
                                    <Card shadow="sm" p="lg" radius="md" withBorder key={bundle.uuid}>
                                        <Card.Section>
                                            <Image p={10} radius="md"
                                                src={bundle.verticalPromoImage}
                                            />

                                        </Card.Section>

                                        <Group position="apart" mt="md" mb="xs">
                                            <Text weight={500} align="center">{bundle.displayName}</Text>
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
