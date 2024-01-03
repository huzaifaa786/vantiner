import { Button, Card, Text, TextInput, Title } from "@tremor/react";
import { prisma } from "../../../lib/prisma";

export default async function CategoryCreate() {
    const category = await prisma.category.findFirst({
        where: {
            id: 1
        }
    })
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            Category : {category?.name}
            <div className="mt-5">
                <Card className="w-3/4">
                    <Title>Create Category</Title>
                    <Text>Create a category for Vantiner</Text>
                    <TextInput className="mt-4" placeholder="Category Name" />
                    <div className="flex justify-end">
                        <Button className="mt-4" size="xs">Create</Button>
                    </div>
                   </Card>
            </div>
        </main>
    );
}