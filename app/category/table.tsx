import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Button,
  TextInput,
} from '@tremor/react';
import useSWR, { mutate } from 'swr';
import { useState } from 'react';

interface Category {
  id: number;
  name: string;
}

const CategoryTable = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: categories, error, isLoading } = useSWR<Category[]>(`/api/category`, fetcher);

  const [editId, setEditId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState('');

  const handleEdit = (id: number) => {
    setEditId(id);
    const categoryToEdit = categories?.find((category) => category.id === id);
    if (categoryToEdit) {
      setEditedName(categoryToEdit.name);
    }
  };

  const handleSaveEdit = async (id: number) => {
    const data = {
      "name": editedName,
    };

    try {
      await fetch(`/api/category/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('done');

      setEditId(null);
      setEditedName('');

      mutate('/api/category');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id: number) => {
    // Use browser confirmation dialog
    const shouldDelete = window.confirm('Are you sure you want to delete this category?');

    if (shouldDelete) {
      try {
        await fetch(`/api/category/${id}`, {
          method: 'DELETE',
        });

        console.log('Category deleted successfully');

        // Refresh the data after deletion
        mutate('/api/category');
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };


  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categories ? (
          categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>
                {editId === category.id ? (
                  <TextInput className='w-64'
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  category.name
                )}
              </TableCell>
              <TableCell>
                {editId === category.id ? (
                  <Button onClick={() => handleSaveEdit(category.id)} size="xs">
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => handleEdit(category.id)} size="xs">
                    Edit
                  </Button>
                )}
                <Button
                  onClick={() => handleDelete(category.id)}
                  size="xs"
                  color="orange"
                  className="ml-2"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>No data available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
