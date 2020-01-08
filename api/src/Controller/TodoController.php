<?php
namespace App\Controller;

use App\Entity\Todo;
use App\Service\TodoService\TodoService;
use PDOException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class TodoController extends AbstractController
{
    private $service;

    public function __construct()
    {
        $this->service = new TodoService();
    }
    public function getList(Request $request): Response
    {
        $data = $this->service->getTodos();
        return $this->json($data);
    }

    public function updateTodos(Request $request): Response
    {
        $todos = json_decode($request->getContent());
        $resp = new Response();
        try {
            $this->service->updateOrCreateTodos($todos);
            $output = $this->service->getTodos();
            $resp->setStatusCode(Response::HTTP_CREATED);
            $resp->setContent(json_encode($output));
            return $resp;
        } catch (PDOException $e) {
            $resp->setStatusCode(Response::HTTP_BAD_REQUEST);
            $resp->setContent(json_encode($e->getMessage()));
            return $resp;
        }
    }
}
