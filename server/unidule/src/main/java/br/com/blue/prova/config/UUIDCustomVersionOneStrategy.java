/*
 * Hibernate, Relational Persistence for Idiomatic Java
 *
 * License: GNU Lesser General Public License (LGPL), version 2.1 or later.
 * See the lgpl.txt file in the root directory or <http://www.gnu.org/licenses/lgpl-2.1.html>.
 */
package br.com.blue.prova.config;

import com.github.f4b6a3.uuid.UuidCreator;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.UUIDGenerationStrategy;

import java.util.UUID;

@SuppressWarnings("unused")
public class UUIDCustomVersionOneStrategy implements UUIDGenerationStrategy {
    @Override
    public int getGeneratedVersion() {
        return 1;
    }

    @Override
    public UUID generateUUID(SharedSessionContractImplementor session) {
        return UuidCreator.getTimeBasedWithMac();
    }
}