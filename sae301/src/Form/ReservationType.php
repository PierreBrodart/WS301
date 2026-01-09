<?php

namespace App\Form;

use App\Entity\Reservation;
use App\Entity\Tarif;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ReservationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('typeReservation', ChoiceType::class, [
                'choices' => [
                    'Particulier' => 'particulier',
                    'Groupe / Association' => 'groupe',
                ],
                'expanded' => true,
                'data' => 'particulier', // Sélection par défaut
                'label' => 'Vous êtes :',
            ])
            ->add('dateVisite', DateType::class, [
                'widget' => 'single_text',
                'label' => 'Date de visite',
            ])
            ->add('heureVisite', TimeType::class, [
                'widget' => 'choice',
                'hours' => range(8, 17),
                'minutes' => [0, 15, 30, 45],
                'label' => 'Heure',
            ])
            ->add('nombrePlaces', IntegerType::class, [
                'label' => 'Nombre de places',
                'attr' => ['min' => 1]
            ])
            ->add('nom', TextType::class)
            ->add('prenom', TextType::class)
            ->add('email', EmailType::class)
            ->add('nomGroupe', TextType::class, [
                'required' => false,
                'label' => 'Nom du groupe',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Reservation::class,
        ]);
    }
}
