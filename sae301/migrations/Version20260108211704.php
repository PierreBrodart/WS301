<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260108211704 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY `FK_42C84955357C0A59`');
        $this->addSql('DROP INDEX IDX_42C84955357C0A59 ON reservation');
        $this->addSql('ALTER TABLE reservation DROP tarif_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation ADD tarif_id INT NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT `FK_42C84955357C0A59` FOREIGN KEY (tarif_id) REFERENCES tarif (id)');
        $this->addSql('CREATE INDEX IDX_42C84955357C0A59 ON reservation (tarif_id)');
    }
}
