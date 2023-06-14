package br.com.blue.prova.repository;

import br.com.blue.prova.domain.UserMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMasterRepository extends JpaRepository<UserMaster, Long>, JpaSpecificationExecutor<UserMaster> {
}
