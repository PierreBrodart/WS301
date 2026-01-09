<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Form\ReservationType;
use App\Repository\TarifRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ReservationController extends AbstractController
{
    #[Route('/reservation', name: 'reservation_index')]
    public function index(Request $request, EntityManagerInterface $em, TarifRepository $tarifRepo): Response
    {
        $reservation = new Reservation();
        $reservation->setCreatedAt(new \DateTime());

        $tarifs = $tarifRepo->findAll();
        $form = $this->createForm(ReservationType::class, $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($reservation);
            $em->flush();
            return $this->redirectToRoute('reservation_success');
        }

        return $this->render('reservation/index.html.twig', [
            'form' => $form->createView(),
            'tarifs' => $tarifs,
        ]);
    }

    #[Route('/reservation/confirmation', name: 'reservation_success')]
    public function success(): Response
    {
        return $this->render('reservation/success.html.twig');
    }
}
