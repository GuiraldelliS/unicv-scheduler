package br.com.blue.prova.repository;

import br.com.blue.prova.domain.Studant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface StudantRepository extends JpaRepository<Studant, Long>, JpaSpecificationExecutor<Studant> {
}
