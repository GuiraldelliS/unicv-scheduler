package br.com.blue.prova.repository;

import br.com.blue.prova.domain.Studant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudantRepository extends JpaRepository<Studant, Long>, JpaSpecificationExecutor<Studant> {

    @Query(value = """
            select * from studant where user_master_id = :userMasterId
            """, nativeQuery = true)
    Optional<Studant> findStudantLogado(String userMasterId);
}
