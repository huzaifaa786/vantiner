'use client';

import { Button, Card, Text, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import CategoryTable from "./table";
import useSWR from 'swr';

const CategoryPage = () => {
    const [name, setName] = useState('');

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { mutate } = useSWR('/api/category', fetcher);

    const saveCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (name !== "") {
            const data = {
                "name": name,
            };
            console.log(data);
            fetch(`/api/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success > 0) {
                        console.log('done');
                        setName(''); 
                        mutate();
                    }
                });
        }
    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="mt-5">
                <Card>
                    <Title>Create Category</Title>
                    <Text>Create a category for Vantiner</Text>
                    <form onSubmit={saveCategory}>
                        <TextInput className="mt-4" placeholder="Category Name" value={name} onChange={e => setName(e.target.value)} />
                        <div className="flex justify-end">
                            <Button type="submit" className="mt-4" size="xs">Create</Button>
                        </div>
                    </form>
                </Card>
                <Card className="mt-6">
                    <CategoryTable />
                </Card>
            </div>
        </main>
    );
}

export default CategoryPage;
