package br.com.blue.prova.repository;

import br.com.blue.prova.domain.UserMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserMasterRepository extends JpaRepository<UserMaster, String>, JpaSpecificationExecutor<UserMaster> {

    @Query(value = """
            select count(id) > 0 from user_master where id = :userMasterId
            """, nativeQuery = true)
    Boolean checkExistUserMaster(String userMasterId);
}
