<?php

namespace App\Service\TodoService;

use App\Database;
use App\Entity\Todo;
use PDO;

class TodoService
{
    private PDO $connection;

    // Just for mock application:
    /* @var $todos Todo[] */
    private static array $todos;

    public function __construct()
    {
        $this->connection = Database::getInstance()->getDatabase();
        // Again, mock application stuff:
        $this->setTodos($this->generateMockTodos());

    }

    public function setTodos($todos) {
        self::$todos = $todos;
    }

    private function generateMockTodos()
    {
        $data = [];
        for ($i = 0; $i < 10; $i++) {
            $todo = new Todo();
            $todo->title = 'Todo ' . $i;
            $todo->category = 'Category' . $i;
            $data[] = $todo;
        }
        return $data;
    }

    public function getTodos()
    {
        // Dummy return
        return self::$todos;

        // Actual code for retrieval, used dummy instead
//        $stmt = $this->connection->prepare('
//            SELECT * FROM todo
//        ');
//        $stmt->execute();
//        $stmt->setFetchMode(PDO::FETCH_CLASS, Todo::class);
//        return $stmt->fetchAll();
    }

    /**
     * @param Todo[] $todos
     */
    public function updateOrCreateTodos(array $todos)
    {
        $this->setTodos(array_merge(self::$todos, $todos));
        return self::$todos;

//        $new_todos = array_filter($todos, function($t) {
//            return !property_exists($t, 'id');
//        });
//
//        $update_todos = array_filter($todos, function($t) {
//            return property_exists($t, 'id');
//        });
//
//        $this->createTodos($new_todos);
//
//        $this->updateTodos($update_todos);
    }

    public function createTodos(array $todos)
    {
        // So this code should add todos to the db

        $sql = "INSERT INTO `todos`
                    (title, category, completed)
                VALUES
                    (:title,:category,:completed)";

        $stmt = $this->connection->prepare($sql);

        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':completed', $completed);

        foreach($todos as $row)
        {
            $title = $row->title;
            $category = $row->category;
            $completed = (int)$row->completed;
            $stmt->execute();
        }
    }

    public function updateTodos(array $todos)
    {
        $sql = "UPDATE `todos`
                    (title, category, completed)
                SET
                    `title`=:title, `category`=:category, `completed`:completed)
                WHERE
                    `id`=:id";

        $stmt = $this->connection->prepare($sql);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':completed', $completed);

        foreach($todos as $row)
        {
            $id = $row->id;
            $title = $row->title;
            $category = $row->category;
            $completed = (int)$row->completed;
            $stmt->execute();
        }
    }
}
